import { NextApiRequest, NextApiResponse } from "next";
import googleTrends from "google-trends-api";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const keywords = req.body;
  if (!keywords) {
    res.status(404).end();
  }
  const endTime = new Date();
  let jsonData1 = [];
  let jsonData2 = [];
  for (let i = 0; i < keywords.length; i++) {
    const searchObj = {
      keyword: keywords[i],
      startTime: new Date("2010/1"),
      endTime,
      geo: "JP",
      hl: "ja",
    };
    // 関連するクエリを取得
    await googleTrends
      .interestOverTime(searchObj)
      .then(function(res) {
        var json = JSON.parse(res);
        const keyword = searchObj.keyword;
        const timelineData = json.default.timelineData;
        if (timelineData) {
          let mapDateObj1 = {};
          let mapDateObj2 = {};
          let yearMonthId = "";
          let totalValue = 0;
          let monthlyTotalValue = 0;
          timelineData.map((data) => {
            const formattedAxisTime = data.formattedAxisTime;
            const yearMonth = formattedAxisTime
              .split("/")
              .slice(0, 2)
              .join("/");
            if (!yearMonthId) {
              // 年月がセットされていなかったら年月のセット
              yearMonthId = yearMonth;
            }
            if (yearMonthId == yearMonth) {
              // 同じ年月だった場合totalValueに足す
              if (data.hasData[0]) {
                totalValue += data.value[0];
                monthlyTotalValue += data.value[0];
              }
            } else {
              if (data.hasData[0]) {
                totalValue += data.value[0];
                monthlyTotalValue += data.value[0];
              }
              mapDateObj1[yearMonth] = totalValue;
              mapDateObj2[yearMonth] = monthlyTotalValue;
              // 新しい年月になったら今までの値をObjectにセットし、年月を更新
              yearMonthId = yearMonth;
              monthlyTotalValue = 0;
            }
          });
          jsonData1.push({
            Label: keyword,
            Image: "",
            ...mapDateObj1,
          });
          jsonData2.push({
            Label: keyword,
            Image: "",
            ...mapDateObj2,
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  // CSVのデータをファイルに書き込み
  if (jsonData1.length > 0) {
    res.status(200).send([jsonData1, jsonData2]);
  } else {
    res.status(400).end();
  }
};

export default handle;
