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
    hideCitySelector } from './actions'
import { bindActionCreators } from 'redux'
import Selector from '../common/Selector'

function App(props) {
    const { from, to, dispatch,

        isCitySelectorVisible,
        cityData,
        isLoadingCityData,

     } = props
    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    // const doExchangeFromTo = useCallback(() => {
    //     dispatch(exchangeFromTo())
    // }, [dispatch])

    // const doShowCitySelector = useCallback((m) => {
    //     dispatch(showCitySelector(m))
    // }, [dispatch])

    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch)
    }, [dispatch])

    const cbsCity = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector
        }, dispatch)
    }, [dispatch])
    
    return (
        <div>
            <Header title="火车票" onBack={onBack} />
            <form className="form">
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                // exchangeFromTo={doExchangeFromTo}
                // showCitySelector={doShowCitySelector}
                />
                <DepartDate />
                <HighSpeed />
                <Submit />
            </form>
            <Selector
                show={isCitySelectorVisible}
                selectedData = {cityData}
                isLoading = {isLoadingCityData}
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