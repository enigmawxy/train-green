import React, {
    useState,
    useMemo,
    useEffect,
    memo,
    useCallback
} from 'react'
import './Selector.scss'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const DataItem = memo(function DataItem(props) {
    const {
        name,
        onSelect,
    } = props

    return (
        <li
            className='data-li'
            onClick={() => onSelect(name)}
        >{name}</li>
    )
})

DataItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

const SectionItem = memo(function SectionItem(props) {
    const {
        title,
        cities = [],
        onSelect,
    } = props

    return (
        <ul className='data-ul'>
            <li className='data-li' data-cate={title}>{title}</li>
            {
                cities.map(city => {
                    return (
                        <DataItem
                            key={city.name}
                            name={city.name}
                            onSelect={onSelect}
                        />
                    )
                })
            }
        </ul>
    )
})

SectionItem.propTypes = {
    title: PropTypes.string.isRequired,
    cities: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
}

const DataList = memo(function DataList(props) {
    const { sections, onSelect, toAlpha } = props

    return (
        <div className="data-list">
            <div className='data-cate'>
                {
                    sections.map(section => {
                        return (
                            <SectionItem
                                key={section.title}
                                title={section.title}
                                cities={section.citys}
                                onSelect={onSelect}
                            />
                        )
                    })
                }
            </div>
            <div className='data-index'>
                {
                    alphabet.map(alpha => {
                        return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />
                    })
                }
            </div>
        </div>
    )
})

DataList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    toAlpha: PropTypes.func.isRequired,
}

const alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index)
})

const AlphaIndex = memo(function AlphaIndex(props) {
    const { alpha, onClick } = props

    return (
        <i className='index-item' onClick={() => onClick(alpha)}>
            {alpha}
        </i>
    )
})

AlphaIndex.propTypes = {
    alpha: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

const Selector = memo(function Selector(props) {
    const { show, selectedData, isLoading, onBack, fetchData, onSelect } = props
    const [searchKey, setSearchKey] = useState('')
    const key = useMemo(() => searchKey.trim(), [searchKey])

    useEffect(() => {
        console.log(selectedData)
        if (!show || selectedData || isLoading) return
        fetchData()
    }, [show, selectedData, isLoading, fetchData])

    const toAlpha = useCallback(alpha => {
        document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
    }, [])

    const ouputCitySections = () => {
        if (isLoading) {
            return <div>Loading</div>
        }
        if (selectedData) {
            return (
                <DataList
                    sections={selectedData.cityList}
                    onSelect={onSelect}
                    toAlpha={toAlpha}
                />
            )
        }
    }
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
            {ouputCitySections()}
        </div>
    )
})

Selector.propTypes = {
    show: PropTypes.bool.isRequired,
    selectedData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default Selector