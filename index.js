class EasyFetchLLM {
    constructor(llm) {
        this.url = llm.url
        this.key = llm.key
        this.model = llm.model
    }


    async Text2Text(system, user, destination) {
        const method = 'POST'
        const headers = new Headers({
            'Authorization': `Bearer ${this.key}`,
            'Content-Type': 'application/json',
        })
        const body = JSON.stringify({
            model: this.model,
            messages: [
                { role: "system", content: system },
                { role: "user", content: user }
            ],
            stream: true,
        })

        const response = await fetch(this.url, { method, headers, body })

        Output(response, destination)
    }

    async Image2Text(system, imageURL, user, destination) {
        const method = 'POST'
        const headers = new Headers({
            'Authorization': `Bearer ${this.key}`,
            'Content-Type': 'application/json',
        })
        const body = JSON.stringify({
            model: this.model,

            messages: [
                { role: "system", content: [{ type: "text", text: system }] },
                {
                    role: "user", content: [
                        { type: "image_url", image_url: { url: imageURL } },
                        { type: 'text', text: user }
                    ]
                }
            ],
            stream: true,
        })
        const response = await fetch(this.url, { method, headers, body })
        Output(response, destination)
    }

    async Text2Image(prompt, destination) {
        const method = 'POST'
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.key}`,
        })
        const body = JSON.stringify({
            model: this.model,
            prompt: prompt,
        })

        console.log('Image Generating ... ...')
        const response = await fetch(this.url, { method, headers, body })
        const imageURL = (await response.json()).data[0].url
        if (destination == 'node') console.log(imageURL)
        else { destination.innerText = imageURL }
    }

}

// response --> DOM Element or Node Console
async function Output(response, destination) {
    const reader = await response.body.getReader()
    const utf8Decoder = new TextDecoder('utf-8')

    while (true) {
        let { done, value } = await reader.read()
        let result = utf8Decoder.decode(value)

        let content = result.match(/{"content":"(.*?)"}/g)

        content?.forEach(x => {
            if (destination !== 'node') {
                destination.innerText += JSON.parse(x).content
            }
            if (destination == 'node') {
                process.stdout.write(JSON.parse(x).content)
            }
        })

        if (done) break
    }


}


export { EasyFetchLLM }



