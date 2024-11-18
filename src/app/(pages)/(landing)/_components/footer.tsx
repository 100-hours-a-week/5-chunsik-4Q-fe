import styles from "./footer.module.css";
import logo from "../../../../../public/images/logo_white.svg";
import { Button } from "antd";

const privacyPolicyUrl =
  "https://qqqqworld.notion.site/10a81b02780680a9b219f3be379d8191?pvs=4";
const termsOfServiceUrl = "https://qqqqworld.notion.site";

export default function Footer() {
  return (
    <div className={styles.container}>
        <div className={styles.information}>
          <span>
            제주시 특별자치도 이도이동 1921 | 대표이사 : chen
          </span>
        </div>
        <div className={styles.text}>Copyright &#9426; qqqq.world</div>
        <img src={logo.src} alt="footer_logo" className={styles.logo} />
        <div className={styles.linkBtnContainer}>
          <Button
            type="link"
            href={privacyPolicyUrl}
            target="_blank"
            style={{ color: "#CCCCCC", marginLeft: '10px', padding: 0, fontSize: '12px', textDecoration: 'underline'}}
          >
            개인정보처리방침
          </Button>
          <Button
            type="link"
            href={termsOfServiceUrl}
            target="_blank"
            style={{ color: "#CCCCCC", fontSize: '12px', textDecoration: 'underline'}}
          >
            서비스 이용약관
          </Button>
        </div>
      </div>
  );
}
