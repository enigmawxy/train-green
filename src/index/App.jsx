import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import { h0 } from '../common/fp';

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
setDepartDate,
} from './actions'

import { bindActionCreators } from 'redux'
import Selector from '../common/Selector'
import DateSelector from '../common/DateSelector'

function App(props) {
    const { from, to, dispatch,
        isDateSelectorVisible,
        
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,

        departDate,
    } = props
    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch)
    }, [dispatch])

    const cbsCity = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchData: fetchCityData,
            onSelect: setSelectedCity,
        }, dispatch)
    }, [dispatch])

    const departDateCbs = useMemo(()=>{
        return bindActionCreators({onClick: showDateSelector}, dispatch)
    }, [dispatch])

    const dateSelectorCBS= useMemo(()=>{
        return bindActionCreators({onBack: hideDateSelector}, dispatch)
    }, [dispatch])
 const onSelectDate = useCallback(day => {
        if (!day) {
            return;
        }

        if (day < h0()) {
            return;
        }

        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    }, [dispatch]);
    return (
        <div>
            <Header title="火车票" onBack={onBack} />
            <form className="form">
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <DepartDate 
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed />
                <Submit />
            </form>
            <Selector
                show={isCitySelectorVisible}
                selectedData={cityData}
                isLoading={isLoadingCityData}
                {...cbsCity}
            ></Selector>
            <DateSelector 
                show={isDateSelectorVisible}
                {...dateSelectorCBS}
 onSelect={onSelectDate}
            />
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