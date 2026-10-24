import type { ContactPage } from "$lib/types/contact"
export const contactPageMock: ContactPage = {
   mail: 'jsscottsama@gmail.com',
   cv: 'assets/files/Jordan-Sama_cv-1.pdf',
   gitHub: 'https://github.com/RitoJS',
   externLink: [
    {
        name: 'wordpress',
        icon: 'assets/icons/wordpress.svg',
        link: 'https://picrito.wordpress.com/'
    },
    {
        name: 'linkedin',
        icon:'assets/icons/linkedin.svg',
        link: 'https://www.linkedin.com/in/jordan-sama'
    }
   ]
}