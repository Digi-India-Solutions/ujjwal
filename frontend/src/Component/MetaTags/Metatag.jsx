import React from 'react'
import { Helmet } from 'react-helmet'

const Metatag = ({title, description, keyword}) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keyword" content={keyword} />
            </Helmet>
        </>
    )
}

export default Metatag