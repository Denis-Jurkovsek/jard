import styles from "../styles/Home.module.css";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

function SkeletonComponent(props) {

    return (
        <div className={styles.skeleton}>
            <SkeletonTheme baseColor="#fff" highlightColor="#c1c1c1">
                <Skeleton style={{ marginBottom: '15px' }} height={90} width={100}/>
                <Skeleton style={{ paddingBottom: '5px' }} height={10} width={50} />
                <Skeleton height={15} width={70} />
                <Skeleton height={10} width={30} />
                <Skeleton style={{ borderRadius: '20px' }} height={20} width={50} />
            </SkeletonTheme>
            <p>loading...</p>
        </div>
    );
}
export default SkeletonComponent;
