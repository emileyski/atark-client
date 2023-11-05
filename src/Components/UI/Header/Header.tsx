import { FunctionComponent, useEffect } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header: FunctionComponent = () => {
  const navigate = useNavigate();

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
    <div className={styles.header6} data-animate-on-scroll>
      <img className={styles.icon} alt="" src="/-1@2x.png" />
      <div className={styles.background} />
      <div className={styles.filter} />
      <div className={styles.navbarStyle2NavbarLight}>
        <div className={styles.navbarToggler}>
          <div className={styles.navbarTogglerIcon} />
        </div>
        <div className={styles.collapseNavbarCollapse}>
          <div className={styles.navbarNav}>
            <button
              onClick={() => navigate("/signin")}
              className={styles.btnText}
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className={styles.buttonbtnprimaryColor}
            >
              <b className={styles.btnText1}>Sign Up</b>
              <img
                className={styles.icnArrowRightIcnXs}
                alt=""
                src="/icn-arrowright-icnxs.svg"
              />
            </button>
          </div>
        </div>
        <img className={styles.icon1} alt="" src="/-2-1@2x.png" />
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.mainContent}>
            <div className={styles.h1Headline7}>
              <p className={styles.p}>
                Програмна система організації доставки між містами
              </p>
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
                <b className={styles.btnText2}>Попробовать</b>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.colMd4}>
            <div className={styles.cardItem}>
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
            <div className={styles.cardItem}>
              <img className={styles.truck81} alt="" src="/truck-8-1@2x.png" />
              <b className={styles.h3FeatureTitle2}>
                Свыше 100 000 рейсов в год
              </b>
            </div>
          </div>
          <div className={styles.colMd42}>
            <div className={styles.cardItem2}>
              <img
                className={styles.insurance31}
                alt=""
                src="/insurance-3-1@2x.png"
              />
              <b className={styles.h3FeatureTitle3}>Своя служба безопасности</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
