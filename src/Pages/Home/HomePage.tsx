import { FunctionComponent, useEffect } from "react";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.user.userData);

  // console.log(userData);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div className={styles.homepage}>
      <div className={styles.forDriversInfo} data-animate-on-scroll>
        <div className={styles.contact5}>
          <div className={styles.frame}>
            <div className={styles.container}>
              <div className={styles.row}>
                <div className={styles.colMd5}>
                  <b className={styles.h2}>Для перевозчиков</b>
                </div>
                <div className={styles.colMd51}>
                  <div className={styles.customFormGroupSubscribe}>
                    <button className={styles.buttonbtnprimaryColor}>
                      <b className={styles.btnText}>Присоединяйтесь</b>
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <img
                    className={styles.icnCircleCircleXsSecondary}
                    alt=""
                    src="/icncircle-circlexs-secondarycolor1.svg"
                  />
                  <div className={styles.h6}>
                    Все грузовладельцы на одной платформе – участвуйте в
                    аукционах и тендерах, получайте выгодные заказы
                  </div>
                </div>
                <div className={styles.featureItem1}>
                  <img
                    className={styles.icnCircleCircleXsSecondary}
                    alt=""
                    src="/icncircle-circlexs-secondarycolor11.svg"
                  />
                  <div className={styles.h61}>
                    Только выгодные рейсы – наши перевозчики зарабатывают более
                    200 000 гривен в год с каждой машины
                  </div>
                </div>
                <div className={styles.featureItem2}>
                  <img
                    className={styles.icnCircleCircleXsSecondary}
                    alt=""
                    src="/icncircle-circlexs-secondarycolor1.svg"
                  />
                  <div className={styles.h62}>
                    Гарантия загрузки – у нас более 70 000 рейсов
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contact2}>
        <div className={styles.background}>
          <div className={styles.cover} />
        </div>
        <div className={styles.container1}>
          <div className={styles.row1}>
            <div className={styles.colMd7}>
              <b className={styles.h2}>Gruzi.ua</b>
              <div className={styles.paragraph}>
                Это цифровая платформа для грузоперевозок. Пользователям
                доступны продукты и сервисы для автоматизации закупки и
                исполнения перевозок: транспортные тендеры, спот-аукционы, TMS и
                трекинг. Цифровые продукты Gruzi.ua объединены в экосистему,
                интегрированы с ИТ-системами грузоотправителей, позволяют
                оптимизировать рутинные процессы и значительно снизить расходы
                на транспортную логистику.
              </div>
            </div>
            <div className={styles.colMd52}>
              <button className={styles.buttonbtnprimaryColor1}>
                <b className={styles.btnText}>Скачать презентацию</b>
              </button>
            </div>
          </div>
          <div className={styles.customFormGroupSubscribe1} />
          <div className={styles.row2}>
            <div className={styles.mainContent}>
              <div className={styles.cardItem}>
                <img className={styles.icon} alt="" src="/-1@2x.png" />
                <form className={styles.div}>
                  <b className={styles.h3}>Связаться с нами</b>
                  <div className={styles.cardContent}>
                    <div className={styles.formGroup}>
                      <div className={styles.formControl}>Имя *</div>
                      <div className={styles.formControlInputStyle1}>
                        <input
                          className={styles.inputformControl}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className={styles.formGroupCustomSelect}>
                      <div className={styles.formControl}>
                        Адрес электронной почты *
                      </div>
                      <div className={styles.formControlInputStyle11}>
                        <input
                          className={styles.inputformControl1}
                          placeholder="example@gmail.com  "
                          type="text"
                        />
                      </div>
                    </div>
                    <div className={styles.formGroupCustomSelect}>
                      <div className={styles.formControl}>Компания *</div>
                      <div className={styles.customSelect}>
                        <input className={styles.select} type="text" />
                      </div>
                    </div>
                    <div className={styles.formGroupCustomSelect}>
                      <div className={styles.formControl}>Телефон *</div>
                      <div className={styles.customSelect}>
                        <input
                          className={styles.select1}
                          placeholder="8(999)-000-00-00"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <button className={styles.buttonbtnprimaryColor2}>
                    <b className={styles.btnText}>Отправить</b>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header6} data-animate-on-scroll>
        <img className={styles.icon1} alt="" src="/-1@2x.png" />
        <div className={styles.background1} />
        <div className={styles.filter} />
        <div className={styles.navbarStyle2NavbarLight}>
          <div className={styles.navbarToggler}>
            <div className={styles.navbarTogglerIcon} />
          </div>
          <div className={styles.collapseNavbarCollapse}>
            <div className={styles.navbarNav}>
              {!userData ? (
                <>
                  <button
                    onClick={() => navigate("/app/signin")}
                    className={styles.btnText3}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate("/app/signup")}
                    className={styles.buttonbtnprimaryColor3}
                  >
                    <b className={styles.btnText4}>Sign Up</b>
                    <img
                      className={styles.icnArrowRightIcnXs}
                      alt=""
                      src="/icn-arrowright-icnxs.svg"
                    />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/app/dashboard")}
                    className={styles.buttonbtnprimaryColor3}
                  >
                    <b className={styles.btnText4}>
                      {userData.name}, to dashboard ({userData.role})
                    </b>
                    <img
                      className={styles.icnArrowRightIcnXs}
                      alt=""
                      src="/icn-arrowright-icnxs.svg"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
          <img className={styles.icon2} alt="" src="/-2-1@2x.png" />
        </div>
        <div className={styles.container2}>
          <div className={styles.row3}>
            <div className={styles.mainContent1}>
              <div className={styles.h1Headline7}>
                <p className={styles.p}>{`Цифровая платформа `}</p>
                <p className={styles.p}>для грузоперевозок</p>
              </div>
              <div className={styles.h4}>
                <p className={styles.p}>
                  Экосистема сервисов для транспортной логистики
                </p>
                <p className={styles.p}>
                  Транспортные тендеры | Спот-аукционы | TMS | Трекинг грузов
                </p>
              </div>
              <div className={styles.cta}>
                <button className={styles.buttonbtnprimaryColorbtnR}>
                  <b className={styles.btnText}>Попробовать</b>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.row4}>
            <div className={styles.colMd4}>
              <div className={styles.cardItem1}>
                <img
                  className={styles.handshake11}
                  alt=""
                  src="/handshake-1-1@2x.png"
                />
                <b className={styles.h3FeatureTitle1}>
                  Более 6 000 перевозчиков уже работают с нами
                </b>
              </div>
            </div>
            <div className={styles.colMd41}>
              <div className={styles.cardItem1}>
                <img
                  className={styles.truck81}
                  alt=""
                  src="/truck-8-1@2x.png"
                />
                <b className={styles.h3FeatureTitle2}>
                  Свыше 100 000 рейсов в год
                </b>
              </div>
            </div>
            <div className={styles.colMd42}>
              <div className={styles.cardItem3}>
                <img
                  className={styles.insurance31}
                  alt=""
                  src="/insurance-3-1@2x.png"
                />
                <b className={styles.h3FeatureTitle3}>
                  Своя служба безопасности
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
