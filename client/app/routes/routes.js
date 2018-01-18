import App from '../component/App';
import ViewAllPosts from '../component/Posts/ViewAllPosts';
import ViewUserPosts from '../component/Posts/ViewUserPosts';
import { Error404 } from '../component/Posts/Error404';
import AddPost from '../component/Posts/AddPost';


const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: ViewAllPosts
      },
      { path: '/user/posts',
        exact: true,
        component: ViewUserPosts
      },
      { path: '/add',
        exact: true,
        component: AddPost
      },
      {
        path: '*',
        component: Error404
      }
    ]
  }
];

export default routes;