import React, { useMemo } from 'react'
import { h0 } from '../common/fp'
import dayjs from 'dayjs'
import './DepartDate.scss'
import PropTypes from 'prop-types'

export default function DepartDate(props) {
    const {time, onClick} = props
    const h0Depart = h0(time)
    const departDate = new Date(h0Depart)
    const departDateString = useMemo(()=>{
        return dayjs(h0Depart).format('YYYY-MM-DD')
    }, [h0Depart])
    const isToday = h0Depart=== h0()
    const weekString = '周' + 
        ['日','一','二','三','四','五','六'][departDate.getDay()]
        + (isToday? '(今天)':'')
    return (
        <div className='depart-date' onClick={onClick}>
            <input type='hidden' name='date' value={departDateString}/>
            {departDateString}<span className='depart-week'>{weekString}</span>
        </div>
    )
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}