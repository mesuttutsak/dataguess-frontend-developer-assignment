import { useEffect, useState } from "react";

import SelectOptions from "../FormElements/SelectOptions";
import DebounceInput from "../FormElements/DebounceInput";

import calculatePagination from "../../utils/calculatePagination";
import detectQuery from "../../utils/detectQuery";
import filterData from "../../utils/filterData";

export const Headline = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='tableHeadline'>
      {children}
    </div>
  )
}

export const Footer = ({ currentPagination, paginationCount, setCurrentPagination }: { currentPagination: number, paginationCount: number, setCurrentPagination: any }) => {
  function goToPage(action: string, count: number) {
    if (action === 'firstPage') setCurrentPagination(1);
    else if (action === 'prevPage') setCurrentPagination(count - 1);
    else if (action === 'nextPage') setCurrentPagination(count + 1);
    else if (action === 'lastPage') setCurrentPagination(paginationCount);
  }

  return (
    <div className='tableFooter'>
      <button onClick={() => goToPage('firstPage', currentPagination)} disabled={!(currentPagination !== 1)}>{'<<'}</button>
      <button onClick={() => goToPage('prevPage', currentPagination)} disabled={!(currentPagination !== 1)}>{'<'}</button>
      <>{currentPagination}-{paginationCount}</>
      <button onClick={() => goToPage('nextPage', currentPagination)} disabled={!(currentPagination !== paginationCount)}>{'>'}</button>
      <button onClick={() => goToPage('lastPage', currentPagination)} disabled={!(currentPagination !== paginationCount)}>{'>>'}</button>
    </div>
  )
}

export const Table = ({ data, loading, setLoading }: { data?: any[] | any, loading: boolean, setLoading: (state: boolean) => void; }) => {
  const [selected, setSelected] = useState<string[]>([]);

  function checkedControl(rowParam: string) {
    return selected.some(param => param === rowParam);
  }

  function isSelect(param: string) {
    const detectedSelectObj = selected.some((selectObj: any) => selectObj === param);

    if (!detectedSelectObj) {
      setSelected((prevState: any) => [...prevState, param]);
    } else {
      setSelected((prevState: any) => prevState.filter((selectedObj: string) => selectedObj !== param));
    }
  }

  useEffect(() => {
    setLoading(false);
  });

  return (
    <div className="tableWrap">
      <div className='table'>
        <div className='tableHeader'>
          <span className='col'>Emoji</span>
          <span className='col'>Code</span>
          <span className='col'>Name</span>
          <span className='col'>Native</span>
          <span className='col'>Capital</span>
          <span className='col'>Languages</span>
        </div>
        <div className='tableBody'>
          {loading ?
            <>'loading...'</> :
            <>
              {
                data.length > 0 ?
                  data.map(({ code, name, emoji, native, capital, currency, languages }: any, index: number) => (
                    <div className={'tableBodyRow ' + `${checkedControl(name + code) ? 'active' : ''}`} key={index.toString() + code} onClick={() => isSelect(name + code)}>
                      <span className='col' title={detectQuery(emoji)}>{detectQuery(emoji)}</span>
                      <span className='col' title={detectQuery(code)}>{detectQuery(code)}</span>
                      <span className='col' title={detectQuery(name)}>{detectQuery(name)}</span>
                      <span className='col' title={detectQuery(native)}>{detectQuery(native)}</span>
                      <span className='col' title={detectQuery(capital)}>{detectQuery(capital)}</span>
                      <span className='col' title={languages.map((language: { code: string }) => detectQuery(language.code)).join(', ')}>
                        {languages.map((language: { code: string }) => detectQuery(language.code).toUpperCase()).join(', ')}
                      </span>
                    </div>
                  )) :
                  'Data bulunmuyor'
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

interface FilterParamsProps {
  text: string;
  group: string;
}

const TableContainer = ({ data }: { data: [] }) => {
  const [filteredData, setFilteredData] = useState<Object[]>([]);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<FilterParamsProps>({ text: '', group: 'all' });

  const [paginationList, setPaginationList] = useState<Object[]>([]);
  const [paginationCount, setPaginationCount] = useState<number>(1);
  const [currentPagination, setCurrentPagination] = useState<number>(1);

  useEffect(() => {
    currentPagination > paginationCount && setCurrentPagination(paginationCount);
  }, [paginationCount])

  useEffect(() => {
    if (data) {
      const { text, group } = filterParams;
      setFilteredData(filterData(data, text, group));
    }
  }, [data])


  useEffect(() => {
    if (filterParams) {
      const { text, group } = filterParams;
      setFilteredData(filterData(data, text, group));
    }
  }, [filterParams])

  useEffect(() => {
    if (filteredData.length > 0) {
      setPaginationList(filteredData.slice(0, 10));
      setPaginationCount(calculatePagination(filteredData.length, 10))
    }
  }, [filteredData])

  useEffect(() => {
    if (filteredData) {
      let detectPagination = currentPagination > 1 ? currentPagination - 1 : 0;
      setPaginationList(filteredData.slice((detectPagination * 10), (detectPagination * 10) + 10));
    }
  }, [filteredData, currentPagination])

  function changeFilterParams(key: 'group' | 'text', value: string) {
    setFilterParams((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }

  const options = [
    'All',
    'Emoji',
    'Code',
    'Name',
    'Native',
    'Capital',
    'Languages'
  ]

  return (
    <div className='tableContainer'>
      <Headline>
        <span>
          <DebounceInput placeholder={"Enter filter text"} onInputValue={(e: string) => changeFilterParams('text', e)} setLoading={(state) => setFilterLoading(state)} />
          <SelectOptions options={options} onChange={(state: string) => changeFilterParams('group', state)} />
        </span>
        <span>
          <button>
            Selected
          </button>
        </span>
      </Headline>

      <Table data={paginationList} loading={filterLoading} setLoading={(state) => setFilterLoading(state)} />

      <Footer
        currentPagination={currentPagination}
        paginationCount={paginationCount}
        setCurrentPagination={(state: number) => setCurrentPagination(state)}
      />
    </div>
  )
}

export default TableContainer