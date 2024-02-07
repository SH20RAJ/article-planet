// pages/your-page-name.js

import Link from 'next/link'; // Import Link component from next/link
import Nav from "../../nav"; // Assuming Nav component is in the components directory

export default function Page({ params }) {
  return (
    <>
      <Nav />
      <div>
        My Post: {params.id} <Link href="../">Go Back</Link>
      </div>
    </>
  );
}
