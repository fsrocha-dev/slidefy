import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import './styles/index.css'
import { ReactNode } from 'react'

interface ChildProps {
  title: string
  description: ReactNode | string
  buttonText: string
  buttonColor: 'red' | 'green' | 'purple'
  children: ReactNode
  parentFunction: Function
}

export function ConfirmModal(props: ChildProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent dark-theme">
          <Dialog.Title className="DialogTitle">{props.title}</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {props.description}
          </Dialog.Description>
          <Dialog.Close />
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button
                onClick={() => props.parentFunction()}
                className={`Button ${props.buttonColor}`}
              >
                {props.buttonText}
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
