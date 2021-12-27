# json-web
Use JSON to minimize your HTML code

## Minimize your HTML file

Download package from npm:

`npm i -g json-web`

To minimize the html file, run the following command:

`json-web <INPUT-HTML> <OUTPUT-JSON> [pretty]`

- `<INPUT-HTML>` - The html file you want to minimize
- `<OUTPUT-JSON>` - The output json file
- `[pretty]` - Include this if you want a readable json file

## Using the compressed HTML file

To use the compressed `output.json` file, you have to put this file and the `lib/extractor.js` file on your webserver.

After that, you'll have to copy your source HTML file onto your webserver.

Now you can replace the body-part of your HTML file with the following code:

```html
<script type="module">
    // make sure this is the correct path to the extractor.js file
	import { extract } from './lib/extractor.js';
    // make sure this is the correct path to your output.json file
	fetch('./minimizer/output.json')
	.then(r=>r.json())
	.then(data => {
		extract(data);
	});
</script>
```

## Known issues

- It can't minimize the header part of your HTML file
- HTML files which don't use CSS frameworks can only be minimized to a certain point (use similar classes if you want to minimize your file more)