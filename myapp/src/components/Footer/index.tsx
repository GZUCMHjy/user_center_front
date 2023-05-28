import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {MY_BLOG} from "@/constant";
const Footer: React.FC = () => {
  const defaultMessage = 'louis出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'MyBlog',
          title: '个人博客',
          href: MY_BLOG,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined />louis Github</>,
          href: 'https://github.com/GZUCMHjy/GZUCMHjy.github.io',
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;
