
const BookmarkletButton = () => {
    /**
   * This hideous piece of HTML that we inject into the bookmarklet div does two things:
   * 1. Provide the app url into the 'window' variable of the timetable app, so that we can pass it into export-data.js that gobbles the timetable data
   * 2. Appends export-data.js itself into the tabletable app view, which gobbles the data and passes it back to us
   */
     const bookmarkletHtml = `<a href="javascript:(()=>{window.secret_injected_app_url = &quot;${process.env.REACT_APP_PUBLIC_URL}&quot;;let script = document.createElement(&quot;script&quot;);script.src=&quot;${process.env.REACT_APP_PUBLIC_URL}/export-data.js&quot;;document.body.append(script);})();" 
     id="bookmarklet" onclick="event.preventDefault()">Bookmark me</a>`
   
  return (<div 
  id="bookmarklet"
  dangerouslySetInnerHTML={{__html: bookmarkletHtml}}>
  </div>);
}

const LandingPage = () => {
  return (
    <BookmarkletButton />
  );
}

export default LandingPage;