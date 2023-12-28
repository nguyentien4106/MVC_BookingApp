import React from 'react'
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
        <div className="blockUI">
            <div className="blockUI__mask" />
                <div className="blockUI__inner">
                    <ReactLoading
                    color="blue"
                    type="spin"
                    height={100}
                    width={100}
                    ></ReactLoading>
            </div>
        </div>
 )
}
