import React from 'react'
import './CastPreview.css'
import user from '../../assets/imgs/user.svg'

const CastPreview = ({ actor, baseUrl }) => {
    return (
        <>

            {actor ?
                <div className="actor_wrapper">

                    {actor.profile_path
                        ? <img className="actor_img" src={`${baseUrl}w185/${actor.profile_path}`} />
                        : <img className="actor_img" src={user} />
                    }
                    <div className="actor_txt_wrapper">
                        <p className="actor_name">{actor.name}</p>
                        <p className="actor_char">{actor.character}</p>
                    </div>
                </div>

                : null
            }
        </>
    )
}
export default CastPreview