/* eslint complexity: ["error", 5] */

import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import { GridStyled, CardStyled, ImageStyled, CardContentStyled, NameStyled, PriceStyled, LoadingStyled, ButtonStyled } from './style'
import Loading from '../Loading'
import Types from '../Types'
import { usePokemonContext } from '../../contexts/pokemon'
import { paths } from '../../routes'

const Gallery = ({ list, loading, paginate }) => {
  const { addCart } = usePokemonContext()
  const { push } = useHistory()

  return (
    <Grid container spacing={2}>
      {loading &&
      <LoadingStyled>
        <Loading backdrop={false} />
      </LoadingStyled>
      }
      {list.length > 0 ? (
        <>
          {list.map((item, index) => (
            <GridStyled item xs={6} sm={4} md={3} lg={2} key={index}>
              <CardStyled>
                <div data-testid="btnViewDetails" onClick={() => push(paths.details.replace(':name', item.name))}>
                  <ImageStyled
                    data-testid="imgGallery"
                    alt={item.name}
                    title={item.name}
                    src={item.sprites.front_default}
                    onMouseOver={(e) => {
                      e.currentTarget.src = item.sprites.back_default
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.src = item.sprites.front_default
                    }}
                    loader={<CircularProgress />}
                  />
                  <CardContentStyled>
                    <NameStyled variant="h5">
                      {item.name}
                    </NameStyled>
                    <PriceStyled variant="subtitle1">
                      {item.base_experience.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </PriceStyled>
                    <Types data={item.types} />
                  </CardContentStyled>
                </div>
                <Button data-testid="btnAddCart" fullWidth size="small" color="secondary" onClick={() => addCart(item)}>
                  Comprar
                </Button>
              </CardStyled>
            </GridStyled>
          ))}
          {paginate &&
            <Grid item xs={12} align="center">
              <ButtonStyled data-testid="btnLoadMore" variant="contained" size="large" color="primary" onClick={() => paginate()}>
                Carregar mais
              </ButtonStyled>
            </Grid>
          }
        </>
      ) :
        !loading && (
          <Grid item xs={12} align="center">
            <Typography>Nenhum Pokemon encontrado...</Typography>
          </Grid>
        )
      }

    </Grid>
  )
}

Gallery.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  paginate: PropTypes.any
}

Gallery.defaultProps = {
  paginate: undefined
}

export default Gallery
