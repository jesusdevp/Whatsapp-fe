import React from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../features/userSlice';
import { getConversationByPicture } from '../../utils/chat';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'transparent',
      border: 'none'
    },
    overlay: {
        background: 'transparent',
        backdropFilter: 'blur(3px)'
    }
  };

ReactModal.setAppElement('#root');

export const ModalImage = () => {

    const dispatch = useDispatch()
    const { user, isOpenModal } = useSelector((state) => state.user)
    const { activeConversation } = useSelector((state) => state.chat)
    

    function closeModal() {
        dispatch(openModal(null))
    }

  return (
    <ReactModal
        isOpen={ isOpenModal ? true : false }
        style={ customStyles }
        onRequestClose={ closeModal }
    >
        <div>
                <img 
                    src={ 
                        isOpenModal?.isGroup
                        ? isOpenModal.picture
                        : isOpenModal?.users
                        ? getConversationByPicture(user, activeConversation?.users)
                        : user.picture 
                    } 
                    className="h-80 w-80 rounded-full object-cover" 
                />
        </div>
    </ReactModal>
  )
}
