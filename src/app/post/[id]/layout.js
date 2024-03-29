import Nav from './nav.js'
import Container from './container.js'
import Related from './related.js';
import Footer from './footer.js';
export const metadata = {
  title: "ArticlePlanet",
  description: "Write, Learn and Share Stories with the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
            
        </head>
        <body>
        
        <Nav />
        <Container html={children}  />
        <div class="hideshare"></div>

        <Related />
        <Footer />
        

      </body>
    </html>
  );
}
