import s from './Layout.module.scss';
import Form from './Form/Form';

const Layout = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.layout}>
          <Form/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
