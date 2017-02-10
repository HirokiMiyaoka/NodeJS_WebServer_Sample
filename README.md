# NodeJS_WebServer_Sample

NodeJsにおける、Webサーバーのサンプルです。

とりあえずドキュメントルート以下のファイルを読みこんで表示するのと、404ページの表示くらいはサポートしています。

## サーバー起動

```
npm run start
```

## サーバー情報

デフォルトは以下。

* URL
    * http://127.0.0.1:8090
* ドキュメントルート
    * public/

## 設定

`config.json` にもろもろの設定があるので、それで設定可能。

## MIME Type

`config.json` のmimeに拡張子に対応するMIME Typeを追加できます。

```
{
	"docroot": "public",
	"port": 8090,
	"host": "127.0.0.1",
	"mime": {
		"png": "image/png",
		"txt": "text/plain"
	}
}
```
