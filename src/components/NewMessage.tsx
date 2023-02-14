import { useState } from 'react';
import { classNames } from '../utils/utils'

type State = '' | 'sending' | 'sent'

interface Props {
  onNewMessage: (message: MessageObj) => void;
}

const NewMessage: React.FC<Props> = ({ onNewMessage }) => {
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState<State>('');
  const [data, setData] = useState<MessageObj>({ name: '', content: '' });
  const [errors, setErrors] = useState<MessageObj>({ name: '', content: '' });

  function sendComment() {
    let errors = { name: '', content: '' };
    if (data.name.length < 4) {
      errors.name = 'Name is too short!';
    } else if (data.name.length > 40) {
      errors.name = 'Name is too long!';
    }

    if (data.content.length < 20) {
      errors.content = 'Message is too short!';
    } else if (data.content.length > 2000) {
      errors.content = 'Message is too long!';
    }

    if (errors.name !== '' || errors.content !== '') {
      setErrors(errors);
      return;
    }

    setState('sending');
    const url = new URL(window.location.toString());
    url.pathname = '/messages/post';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        content: data.content,
      }),
    }).then(() => {
      setState('sent');
      setErrors({ name: '', content: '' });

      onNewMessage(data);
    });
  }
  
  if (state === 'sent') {
    return <span className='block text-green-700'>Message sent!</span>;
  }

  return (
    <>
      <h1 className='text-2xl mt-2'>Write a new message</h1>

      {!expanded &&
        <button
          type='button'
          className={classNames(
            'inline-flex items-center rounded-md border border-transparent bg-indigo-600',
            'px-6 py-3 my-3 text-base font-medium text-white shadow-sm',
            'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          )}
          onClick={() => setExpanded(!expanded)}
        >
          Write a message
        </button>
      }

      {expanded &&
        <form className='w-2/3 m-auto'>
          <div>
            {/* Name */}
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 float-left pt-4'>
                Name
              </label>
              <input
                id='name'
                name='name'
                className={classNames(
                  'mt-1 mb-2 block w-full m-auto rounded-md float-left border-solid border-2 p-4',
                  'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                )}
                placeholder='John Doe'
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
              />
              <span className='text-red-600'>{errors.name !== '' && errors.name}</span>
            </div>

            {/* Message */}
            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 float-left pt-4'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows={3}
                className={classNames(
                  'mt-1 block w-full m-auto rounded-md border-solid border-2',
                  'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                )}
                placeholder='Hello, my name is XYZ :)'
                onChange={(e) => setData({ ...data, content: e.target.value })}
                value={data.content}
              />
              <span className='text-red-600'>{errors.content !== '' && errors.content}</span>
            </div>

            {/* Buttons */}
            <div className='inline-block w-full'>
              <button
                type='button'
                className={classNames(
                  'items-center rounded-md border border-transparent bg-gray-600 float-left',
                  'px-6 py-3 my-3 text-base font-medium text-white shadow-sm',
                  'hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
                )}
                onClick={() => setExpanded(!expanded)}
                disabled={state === 'sending'}
              >
                Close editor
              </button>

              <button
                type='button'
                className={classNames(
                  'items-center rounded-md border border-transparent bg-indigo-600 float-right',
                  'px-6 py-3 my-3 text-base font-medium text-white shadow-sm',
                  'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                  'disabled:bg-gray-600'
                )}
                onClick={() => sendComment()}
                disabled={state === 'sending'}
              >
                {state === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </div>
        </form>
      }
    </>
  );
}

export default NewMessage;