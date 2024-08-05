import classes from "./HomePageList.module.css";

const HomePageList: React.FC = () => {
    return (
        <div className={classes.div}>
            <ul className={classes.list}>
                <li>Tirando foto</li>
                <li>Mandando para Mônica</li>
                <li>Mandando para Mônica</li>
                <li>Mandando para Mônica</li>
                <li>Mandando para Mônica</li>
                <li>Mandando para Mônica</li>
            </ul>
        </div>
    );
}

export default HomePageList;