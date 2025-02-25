# 🎈 EasyFetchLLM ：A JavaScript library to easily fetch llm 

## why develop this project？
There has some OpenAI SDK such as Node.js、Python. But there isn't JavaScript SDK for Browser Environment. So the project is here!

The calling method  is `Fetch()`——standard native HTTP implementation  on Web and Node.js. It is similar to `curl` of shell.

##  Get Started

### Browser environment

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>easy-fetch-llm Demo</title>
</head>

<body>
    System Prompt：<input id="system"> <br>
    User Prompt：<input id="user"> <br>
    <button id="send">send</button> <br>
    Result:
    <div id="result" style="background: oldlace; padding:20px;width:fit-content; "></div>

    <script type="module" async>
        import { EasyFetchLLM } from "https://unpkg.com/easy-fetch-llm";

        const tongyi = {
            url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
            key: 'your-api-key',
            model: 'qwen-plus',
        }

        const client = new EasyFetchLLM(tongyi)

        document.querySelector('#send').onclick = async ()=>{
            const system = document.querySelector('#system').value
            const user = document.querySelector('#user').value
            const result = document.querySelector('#result')
            result.innerText = ''
            client.Text2Text(system, user, result) 
        }
    </script>

</body>

</html>
```

Then，run this html page by a http static server ，you will watch the streaming output in `#result` div .


###  Node.js environment
first，install this library ：

```sh
npm install easy-fetch-llm
```

Next，write a file 'Text2Text.mjs' with content below：

```JavaScript
import {EasyFetchLLM } from 'easy-fetch-llm'

const tongyi = {
    url : 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    key : 'your-api-key',
    model : 'qwen-turbo',
}

const client = new EasyFetchLLM(tongyi)

const system = 'your system prompt'
const user= 'your user prompt'
client.Text2Text(system,user,'node')
```

Then，run `node Text2Text.mjs` . The console of Node.js will output the answer of LLM.



