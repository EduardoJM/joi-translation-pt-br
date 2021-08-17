import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Mensagens em PT-BR',
    Svg: require('../../static/img/draw_flag.svg').default,
    description: (
      <>
        Traduções para as mensagens de erros de validação da biblioteca
        Joi para o idioma português brasileiro (PT-BR).
      </>
    ),
  },
  {
    title: 'Joi',
    Svg: require('../../static/img/draw_contract.svg').default,
    description: (
      <>
        Mensagens prontas para serem utilizadas com as funções de validação da biblioteca Joi.
      </>
    ),
  },
  {
    title: 'Celebrate Middleware',
    Svg: require('../../static/img/draw_middleware.svg').default,
    description: (
      <>
        Mensagens prontas para serem utilizadas com o middleware de validação celebrate.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
