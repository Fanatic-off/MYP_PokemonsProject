import React from 'react';
import { Row, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import './CardsPage.scss';
import { CardItem } from '../../components/CardItem/CardItem';
import { getCards } from '../../api/helpers.tsx';
import { useQuery } from 'react-query';
import { changePage, changePageSize } from '../../store/cardsPageSlice.tsx';
import { useAppSelector, useAppDispatch } from '../../store/hooks.tsx';

export function CardsPage(): React.JSX.Element {
  const page = useAppSelector((state) => state.cardsPage.page);
  const pageSize = useAppSelector((state) => state.cardsPage.pageSize);
  const dispatch = useAppDispatch();

  const {
    data: cards,
    error,
    isLoading,
  } = useQuery(['cards', page, pageSize], () => getCards(page, pageSize));

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    dispatch(changePage(pageNumber));
    dispatch(changePageSize(pageSize));
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div>Error loading cards</div>;
  }

  return (
    <div className="cards-page">
      <Row gutter={16}>
        {cards?.map((item) => <CardItem key={item.id} pokemon={item} />)}
      </Row>
      <Pagination
        showQuickJumper
        defaultCurrent={page}
        pageSize={pageSize}
        pageSizeOptions={[8, 16, 20]}
        total={250}
        onChange={onChange}
      />
    </div>
  );
}
