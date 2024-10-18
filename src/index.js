addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // The URL of the video you want to proxy
  const videoUrl = 'https://84-4.download.real-debrid.com/d/SUD3HOZ63BN2E/Rebel.Ridge.2024.720p.NF.WEBRip.900MB.x264-GalaxyRG.mkv'

  // Create a new request with the video URL
  const modifiedRequest = new Request(videoUrl, {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  })

  // Modify headers as needed
  modifiedRequest.headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
  modifiedRequest.headers.set('Origin', 'https://www.example.com')
  modifiedRequest.headers.set('Host', 'https://www.example.com')

  // Fetch the video from the source
  let response = await fetch(modifiedRequest)

  // Clone the response so that we can modify headers
  let newResponse = new Response(response.body, response)

  // Add CORS headers to allow the video to be accessed from any origin
  newResponse.headers.set('Access-Control-Allow-Origin', '*')

  // Return the modified response
  return newResponse
}
