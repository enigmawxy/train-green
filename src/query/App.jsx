import React from 'react'
import { connect } from 'react-redux'
import './App.css'
import Header from '../common/Header'
import { h0 } from '../common/fp'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'
import URI from 'urijs'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { useEffect } from 'react'
import {
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
    setSearchParsed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    prevDate,
    nextDate,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
} from './actions'

function App(props) {
    const { 
        from, 
        to, 
        departDate,
        highSpeed,
        searchParsed, 
        dispatch,
        orderType,
        onlyTickets,
        isFiltersVisible,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd, } = props

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search)
        const { from, to, date, highSpeed } = queries

        dispatch(setFrom(from))
        dispatch(setTo(to))
        dispatch(setDepartDate(h0(dayjs(date).valueOf())))
        dispatch(setHighSpeed(highSpeed === "true"))

        dispatch(setSearchParsed(true))
    }, [dispatch])

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    useEffect(() => {
        if (!searchParsed) {
            return;
        }
        const url = new URI('/rest/query')
        .setSearch('from', from)
        .setSearch('to', to)
        .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
        .setSearch('highSpeed', highSpeed)
        .setSearch('orderType', orderType)
        .setSearch('onlyTickets', onlyTickets)
        .setSearch(
            'checkedTicketTypes',
            Object.keys(checkedTicketTypes).join()
        )
        .setSearch(
            'checkedTrainTypes',
            Object.keys(checkedTrainTypes).join()
        )
        .setSearch(
            'checkedDepartStations',
            Object.keys(checkedDepartStations).join()
        )
        .setSearch(
            'checkedArriveStations',
            Object.keys(checkedArriveStations).join()
        )
        .setSearch('departTimeStart', departTimeStart)
        .setSearch('departTimeEnd', departTimeEnd)
        .setSearch('arriveTimeStart', arriveTimeStart)
        .setSearch('arriveTimeEnd', arriveTimeEnd)
        .toString();

        fetch(url)
            .then(response => response.json())
            .then(result => {
                const {
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation,
                            },
                        },
                    },
                } = result;
                console.log(result)    
                dispatch(setTrainList(trains));
                dispatch(setTicketTypes(ticketType));
                dispatch(setTrainTypes(trainType));
                dispatch(setDepartStations(depStation));
                dispatch(setArriveStations(arrStation));
            });
    }, [
        from,
        to,
        departDate,
        highSpeed,
        dispatch,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
    ])
    
    if(!searchParsed) return null;

    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
            </div>
            <Nav />
            <List />
            <Bottom />
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch }
    }
)(App)