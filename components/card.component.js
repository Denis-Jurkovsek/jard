import {Col} from "react-grid-system";
import styles from "../styles/Home.module.css";

function CardComponent(props) {

    return (
        <Col>
            <div className={styles.card}>
                <img src={props.image} style={{ width: 100, height: 130, objectFit: 'contain' }}/>
                <p className={styles.company}>{props.company}</p>
                <p>{props.name}</p>
                <p className={styles.price}>{props.price},00€</p>
                <div className={styles.tag}>{props.type}</div>
            </div>
        </Col>
    );
}
export default CardComponent;
