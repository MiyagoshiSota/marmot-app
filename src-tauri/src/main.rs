// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn scan_files() -> Vec<String> {
    //src-tauriからのパス
    let entries: fs::ReadDir = fs::read_dir("/Users/k23122kk/Desktop/marmots").unwrap(); // ReadDir を取得
    let mut file_names: Vec<String> = Vec::new();

    // ループで Result<DieEntry, Error> をひとつずつ処理
    for entry in entries {
        // DirEntry#file_name() でファイル名（ディレクトリ名）を取得できる
        let n: String = entry
            .unwrap()
            .file_name()
            .into_string()
            .expect("Invalid UTF-8");

        //動画ファイルかどうかを判定
        if n.contains(".mp4") {
            file_names.push(n);   
        }
    }

    return file_names;
}

use std::fs;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, scan_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
