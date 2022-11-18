import Link from "next/link";
import styles from "../../styles/pages/Trend.module.scss";
import { useState } from "react";
import { useCSVDownloader } from "react-papaparse";
import axios from "axios";

const ErrorPage = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [jsonData1, setJsonData1] = useState<any>(null);
  const [jsonData2, setJsonData2] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date>(null);
  const [endDate, setEndDate] = useState<Date>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { Type, CSVDownloader } = useCSVDownloader();

  async function createCsv() {
    setLoading(true);
    const res = await axios("/api/trend", {
      method: "POST",
      data: keywords,
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    if (res.data) {
      const jsons = res.data;
      let removeKeyword = [];
      for (let i = 0; i < jsons.length; i++) {
        let filteredJson = [];
        jsons[i].map((data) => {
          let isNoData = false;
          if (Object.keys(data).length < 4) {
            isNoData = true;
          } else {
            isNoData = Object.keys(data).every((key) => {
              if (key === "Label" || key === "Image") {
                return false;
              } else {
                return data[key] === 0;
              }
            });
          }
          if (isNoData) {
            removeKeyword.push(data.Label);
          } else {
            filteredJson.push(data);
          }
        });
        if (i == 0) {
          // 合計
          setJsonData1(filteredJson); // 合計
        } else {
          // 月別
          setJsonData2(filteredJson); // 月別
        }
      }

      alert(
        `成功しました${
          removeKeyword.length > 0
            ? `。ただし「${removeKeyword.join(
                ","
              )}」はデータが見つからなかったため除去されました`
            : ""
        }`
      );
    } else {
      alert("失敗しました");
    }
  }
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
  ];

  const getOptions = () => {
    let options: string[] = [];
    for (let i = 0; i < years.length; i++) {
      for (let j = 0; j < months.length; j++) {
        options.push(`${years[i]}/${months[j]}`);
      }
    }
    return options;
  };

  const dateError = startDate?.getTime() > endDate?.getTime();

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h2 className={styles.title}>google trends to flourish csv</h2>
        <p className={styles.small}>
          対象の年月と比較したいキーワードを設定して、
        </p>
        <p className={styles.small}>CSV作成ボタンを押してください</p>
      </div>
      <div className={styles.block}>
        <label>
          日付
          <select
            onChange={(e) => {
              const option = e.target.value;
              const year = Number(option.split("/")[0]);
              const month = Number(option.split("/")[1]);
              setStartDate(new Date(year, month));
            }}
          >
            <option>開始日</option>
            {getOptions().map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <span>〜</span>
          <select
            onChange={(e) => {
              const option = e.target.value;
              const year = Number(option.split("/")[0]);
              const month = Number(option.split("/")[1]);
              setEndDate(new Date(year, month));
            }}
          >
            <option>終了日</option>
            {getOptions().map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </label>
        {dateError && (
          <p className={styles.error}>エラー:終了日が開始日より早いです</p>
        )}
      </div>
      <div className={styles.block}>
        <label>
          <input
            placeholder=",区切りで複数入力可"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </label>
        <p
          className={styles.button}
          onClick={() => {
            if (value.length > 0) {
              setJsonData1(null);
              setJsonData2(null);
              setValue("");
              if (value.indexOf(",") > -1) {
                // ,区切りで複数入力
                setKeywords([...keywords, ...value.split(",")]);
              } else {
                setKeywords([...keywords, value]);
              }
            }
          }}
        >
          追加
        </p>
      </div>
      <div className={styles.block}>
        <label>
          キーワード：
          <span>{keywords.join(",")}</span>
        </label>
      </div>
      <div className={styles.block}>
        {!jsonData1 &&
          keywords.length > 0 &&
          startDate &&
          endDate &&
          !dateError && (
            <p
              className={styles.button}
              onClick={() => {
                createCsv();
              }}
            >
              CSV作成
            </p>
          )}
        {jsonData1?.length > 0 && (
          <CSVDownloader
            data={jsonData1}
            filename={`合計_${jsonData1.map((data) => data.Label).join("VS")}`}
            type={Type.Button}
            filenameprefix="export"
            className={styles.button}
          >
            合計ダウンロード
          </CSVDownloader>
        )}
        {jsonData2?.length > 0 && (
          <CSVDownloader
            data={jsonData2}
            filename={`月別_${jsonData2.map((data) => data.Label).join("VS")}`}
            type={Type.Button}
            filenameprefix="export"
            className={styles.button}
          >
            月別ダウンロード
          </CSVDownloader>
        )}
        {keywords.length > 0 && (
          <p
            className={styles.button}
            onClick={() => {
              setValue("");
              setKeywords([]);
              setJsonData1(null);
              setJsonData2(null);
              setStartDate(null);
              setEndDate(null);
            }}
          >
            初期化
          </p>
        )}
      </div>
      {loading && <div className={styles.loading} />}
    </div>
  );
};

export default ErrorPage;
