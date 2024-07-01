import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { desktopDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { invoke } from "@tauri-apps/api";

const App = () => {
  const [player, setPlayer] = useState<JSX.Element>();

  //初期まーもっと動画を設定
  useEffect(() => {
    const fn = async () => {
      nextMarmot();
    };
    fn();
  }, []);

  //次のまーもっと動画を設定
  const nextMarmot = async () => {
    console.log("next");
    //デスクトップのパス
    const desktopDirPath = await desktopDir();
    //ディレクトリ内の動画ファイルを取得
    const file_names: string[] = await invoke("scan_files");

    //次の動画を選択
    const new_url = convertFileSrc(
      await join(
        desktopDirPath,
        "/marmots/" + file_names[getRandomInt(file_names.length)]
      )
    );

    const player = (
      <ReactPlayer
        url={new_url}
        controls={true}
        playing={true}
        pip = {true}
        stopOnUnmount={false}
        onEnded={nextMarmot}
      />
    );
    setPlayer(player);
  };

  // 乱数を取得
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <>
      <h1>Marmot Kawaii</h1>
      <div className="marmot-container">{player}</div>
    </>
  );
};

export default App;
