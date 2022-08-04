import{serve}from"https://deno.land/std@0.138.0/http/server.ts"
import{serveDir}from "https://deno.land/std@0.138.0/http/file_server.ts";

let previousWord = 'しりとり,りんご,ぷろぐらむ';

console.log("Listening on http://localhost:8000");
serve(async(req) => {
    
    const pathname = new URL(req.url).pathname;
    console.log(pathname);

    function randomString(){
        const a = 'あいうえおかきくけこさしすせそ'
        previousWord = '';
        for(var i = 0;i < 3;i++){
            rnd +=a.charAt(Math.floor((array[i]/256)*a.lemgth)) 
        }
        return rnd;
    }

    if(req.method === "GET" && pathname === "/shiritori"){
        return new Response(randomString());
    }

    if(req.method === "POST" && pathname === "/shiritori"){
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;
        if(nextWord.match(/^[ぁ-んー　]*$/) != true){
            return new Response("ひらがなを入力してください。",{status:400});
        }
        if(
            nextWord.length > 0 &&
            previousWord.charAt(previousWord.length - 1)!== nextWord.charAt(0)
        ){
            return new Response("前の単語に続いてません。",{status:400});
        }
     
        previousWord = nextWord;
        return new Response(previousWord);
    }

    return serveDir(req,{
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enablueCors: true,
    })
});