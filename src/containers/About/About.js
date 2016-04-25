import React from 'react';
import Helmet from 'react-helmet';
import styles from './styles.scss';

const About = () => {
  return (
    <div className={styles.root}>
      <h1>О нас</h1>
      <Helmet title="О нас"/>

      <p>
        Appetini - сервис доставки комплексных обедов.
        Повара на нашем сайте готовят домашнюю еду в домашних условиях.
        Мы предоставляем удобный интерфейс для заказа приготовленных ими обедов,
        поставляем им упаковку и осуществляем доставку.
      </p>
      <p>
        Обеды доставляются каждый день кроме выходных с 12:30 до 13:00, а также с 13:00 до 13:30.
        Заказ необходимо делать заранее (например, на завтра или на несколько дней вперед).
        Стоимость индивидуальной (одноразовой) доставки 15грн. Для постоянных клиентов (купивших
        доставки по подписке) стоимость значительно ниже - 10-12грн в зависимости от тарифного плана.
      </p>
      <p>
        Количество поваров и выбор блюд будет постоянно увеличиваться, но мы уже сейчас готовы порадовать
        вас вкусными и здоровыми обедами каждый день. Будем рады вашим отзывам и идеям, мы развиваемся
        и становимся лучше вместе с вами и благодаря вам!
      </p>
    </div>
  );
};

export default About;
