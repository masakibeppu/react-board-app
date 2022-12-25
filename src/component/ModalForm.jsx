import Modal from "react-modal";

const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "40%",
    },
  };

const ModalForm = (props) => {
    return (
        <Modal isOpen={editModalIsOpen} style={customStyles} ariaHideApp={false}>
            <PostForm isOpen={setEditModalIsOpen} id={detail.id} title={detail.title} content={detail.content} />
        </Modal>
    )
}

export default ModalForm;