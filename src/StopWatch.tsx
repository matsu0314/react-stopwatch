import { useEffect, useState } from "react";
import "./stopwatch.css";

export const StopWatch = () => {
  const [displayTime, setDisplayTime] = useState("00:00:00");
  const [startTime, setStartTime] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  const [running, setRunning] = useState(false);

  // ボタンをクリックした時の処理
  useEffect(() => {
    console.log("スタート・ストップが切り替わりました");
    let timerInterval: number | undefined = undefined;
    // タイマーが動いている場合
    if (running) {
      timerInterval = window.setInterval(() => {
        if (timeStamp) {
          setTimeStamp(Date.now() - startTime + timeStamp);
        } else {
          setTimeStamp(Date.now() - startTime);
        }
      }, 10);
    }
    // クリーンアップ（タイマーをクリア）
    return () => {
      window.clearInterval(timerInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // タイムスタンプを変換
  useEffect(() => {
    console.log("タイムスタンプを時間に変換します");
    const currentTime = new Date(timeStamp);
    const h = String(currentTime.getHours() - 9).padStart(2, "0");
    const m = String(currentTime.getMinutes()).padStart(2, "0");
    const s = String(currentTime.getSeconds()).padStart(2, "0");
    const ms = String(currentTime.getMilliseconds()).padStart(3, "0");

    setDisplayTime(`${h}:${m}:${s}:${ms}`);
  }, [timeStamp]);

  // スタートボタンクリック（イベント）
  const onClickStart = () => {
    setStartTime(Date.now());
    setRunning(true);
  };
  // ストップボタンクリック（イベント）
  const onClickStop = () => {
    setStartTime(timeStamp);

    setRunning(false);
  };

  // リセットボタンクリック（イベント）
  const onClickReset = () => {
    setRunning(false);
    setDisplayTime("00:00:00");
    setTimeStamp(0);
  };

  console.log("マウントします");

  return (
    <div className="App">
      <h1>ストップウォッチ</h1>
      <time>{displayTime}</time>
      <div>
        <button onClick={onClickStart}>スタート</button>
        <button onClick={onClickStop}>ストップ</button>
        <button onClick={onClickReset}>リセット</button>
      </div>
    </div>
  );
};
