import React, { useState, useMemo, useEffect } from 'react'
import './Selector.scss'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export default function Selector(props) {
    const { show, selectedData, isLoading, onBack, fetchData } = props
    const [searchKey, setSearchKey] = useState('')
    const key = useMemo(()=> searchKey.trim(), [searchKey])

    useEffect(()=> {
        if(!show || selectedData || isLoading) return 
        fetchData()
    }, [show, selectedData, isLoading, fetchData])

    return (
        <div className={classnames('floating-selector', { hidden: !show, })}>
            <div className="data-search">
                <div className='search-back' onClick={() => onBack()}>
                    <svg width='42' height='42'>
                        <polyline
                            points="25,13 16,21 25,29"
                            stroke='#fff'
                            strokeWidth='2'
                            fill='none'
                        />
                    </svg>
                </div>
                <div className='search-input-wrapper'>
                    <input type='text'
                        value={searchKey}
                        className='search-input'
                        placeholder='城市、车站的中文或拼音'
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <i
                    onClick={() => setSearchKey('')}
                    className={classnames('search-clean', {
                        hidden: key.length === 0,
                    })
                    }>
                    &#xf063;
                </i>
            </div>
        </div>
    )
}

Selector.propTypes = {
    show: PropTypes.bool.isRequired,
    selectedData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
}