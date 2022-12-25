import styles from './DeleteForm.module.scss';
const DeleteForm = (props) => {
    return (
        <div>
            <h1 className={styles.postName}>本当に削除しますか？</h1>
            <div className={styles.buttonWrapper}>
                <button onClick={props.delete}>はい</button>
                <button onClick={props.cancel}>いいえ</button>
            </div>
        </div>
    )
}

export default DeleteForm;