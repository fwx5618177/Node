const http = require('http');
const fs = require('fs');
// const { stat } = require('fs').promises;

// 视频路径
const videoPath = './video1.mp4';

http.createServer(async (req, res) => {
    if(req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(
            `
            <video src="/video" width="500" controls="controls"></video>
            `
        )
    }else if(req.url == "/video") {
        // fs.createReadStream(videoPath).pipe(res);

        let range = req.headers.range;
        // console.log(range);
        if (range) {
            let stats = await fs.statSync(videoPath);
            
            // console.log(stats)
            // console.log(stats.size)

            
            let r = range.match(/=(\d+)-(\d+)?/)
            // let r = range.replace(/bytes=/, "").split("-");
            console.log(r)
            let start = parseInt(r[1], 10)
            // console.log(r[1])
            console.log(start)
            let end = r[2] ? parseInt(r[2], 10) : start+1024*1024;
            // console.log(r[2])
            console.log(end)
            if(end > stats.size - 1) {
                end = stats.size - 1;
            }
            console.log(end);

            let head = {
                'Content-Type': 'video/mp4',
                'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                'Content-Length': (end - start) + 1,
                'Accept-Ranges': 'bytes'

            }

            res.writeHead(206, head)
            fs.createReadStream(videoPath, { start: start, end: end}).pipe(res)




            
        }else {
            fs.createReadStream(videoPath).pipe(res);
        }

        
    }
}).listen(3000, () => {
    console.log('正在监听3000端口，请打开http://localhost:3000')
})