import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
} from './actions'

import { bindActionCreators } from 'redux'
import Selector from '../common/Selector'

function App(props) {
    const { from, to, dispatch,

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