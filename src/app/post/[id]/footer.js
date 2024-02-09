import Script from "next/script"
export default function Footer(){
    return (
        <>
  <div className="container margtop3rem">
    <a className="twitter-grid" href="https://codexdindia.blogspot.com/">
      Social
    </a>
  </div>
  <div className="container">
    <div className="footer">
      <p className="pull-left">Copyright © 2024 ArticlePlanet</p>
      <p className="pull-right">
        ArticlePlanet by{" "}
        <a target="_blank" href="https://linktr.ee/cxdiin">
          CXDI
        </a>
      </p>
      <div className="clearfix"></div>
    </div>
  </div>


        <Script src="../site.js"></Script>
        <Script src="../assets/js/jquery.min.js"></Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></Script>
        <Script src="../assets/js/bootstrap.min.js"></Script>
        <Script src="../assets/js/ie10-viewport-bug-workaround.js"></Script>
        <Script src="../assets/js/mediumish.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/prism.min.js"></Script>
        <Script src="../post.js"></Script>

</>

    )
}