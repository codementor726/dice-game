import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { it, vi, test, describe, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { randomUUID } from 'crypto'

import '../i18n'

import { MainModule } from './../modules/main'
import { DiceContext } from '../components/dice-context'
import DiceBoard from '../components/dice-board'
import { DiceRollConditionEnum, round } from 'utils'
import DiceSidebar, { OnLoss, OnWin } from '../components/dice-sidebar'

describe('Manual Bet', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <MainModule />
      </BrowserRouter>
    )
  })

  it('should init elements for bets', () => {
    const profitElement = screen.getByTestId(
      'profit-on-win'
    ) as HTMLInputElement
    const inputElement = screen.getByTestId('bet-amount') as HTMLInputElement
    const sliderElement = screen.getByTestId(
      'dice-slider-input'
    ) as HTMLInputElement
    expect(sliderElement.value).toBe('50.50')
    expect(profitElement.value).toBe('0.00')
    expect(inputElement.value).toBe('0.00')
  })

  it('verify profit amount on win for 50/50', () => {
    const profitElement = screen.getByTestId(
      'profit-on-win'
    ) as HTMLInputElement
    const inputElement = screen.getByTestId('bet-amount') as HTMLInputElement
    const sliderElement = screen.getByTestId(
      'dice-slider-input'
    ) as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: '0.05' } })
    expect(sliderElement.value).toBe('50.50')
    expect(inputElement.value).toBe('0.05')
    expect(profitElement.value).toBe('0.05')
  })

  it('verify profit amount on win for 25', () => {
    const profitElement = screen.getByTestId(
      'profit-on-win'
    ) as HTMLInputElement
    const inputElement = screen.getByTestId('bet-amount') as HTMLInputElement
    const sliderElement = screen.getByTestId(
      'dice-slider-input'
    ) as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: '0.05' } })
    fireEvent.change(sliderElement, { target: { value: 75.0 } })

    expect(sliderElement.value).toBe('75.00')
    expect(inputElement.value).toBe('0.05')
    expect(profitElement.value).toBe('0.15')
  })
})

describe('Manual Best Running', () => {
  it('test bet with another win chance', async () => {
    const newValue = '10.00'
    const rollOverUnder = parseFloat(newValue).toFixed(2)
    let numberRolled = 0

    const setWinChance = vi.fn(() => {})
    const setrollOverUnder = vi.fn(() => {})
    const setNumberRolled = vi.fn(() => {})
    const handleManualBet = vi.fn(() => {})

    render(
      <DiceContext.Provider
        value={{
          numberRolled,
          rollOverUnder,
          isRollOverOrUnder: DiceRollConditionEnum.Over,
          betAmount: '0.05',
          initialBetAmount: '0.00',
          onWin: '0.00',
          onLoss: '0.00',
          currentProfit: 0,
          profitOnWin: '0.00',
          stopOnProfit: '0.00',
          stopOnLoss: '0.00',
          numOfBets: '3',
          betsFinished: 3,
          selectedOnWin: OnWin.AUTO,
          selectedOnLoss: OnLoss.AUTO,
          minBet: '0.00',
          maxBet1: '0.00',
          cashout: '0.00',
          winChance: '10.00',
          gameInProgress: true,
          rotateBoxTo: 10,
          autoBetInProgress: true,
          angle: 10,
          pastBets: [],
          playBetSound: vi.fn(() => {}),
          playDiceRollSound: vi.fn(() => {}),
          playDiceWinSound: vi.fn(() => {}),
          needToStopNextTime: true,
          setInitialBetAmount: vi.fn(() => {}),
          setOnWin: vi.fn(() => {}),
          setOnLoss: vi.fn(() => {}),
          setProfitOnWin: vi.fn(() => {}),
          setStopOnProfit: vi.fn(() => {}),
          setStopOnLoss: vi.fn(() => {}),
          setNumOfBets: vi.fn(() => {}),
          setSelectedOnWin: vi.fn(() => {}),
          setSelectedOnLoss: vi.fn(() => {}),
          setCurrentProfit: vi.fn(() => {}),
          setBetsFinished: vi.fn(() => {}),
          setPastBets: vi.fn(() => {}),
          setAngle: vi.fn(() => {}),
          setRotateBoxTo: vi.fn(() => {}),
          setWinChance,
          setAutoBetInProgress: vi.fn(() => {}),
          setGameInProgress: vi.fn(() => {}),
          setNeedToStopNextTime: vi.fn(() => {}),
          setCashout: vi.fn(() => {}),
          setBetAmount: vi.fn(() => {}),
          setNumberRolled,
          setrollOverUnder,
          setIsRollOverOrUnder: vi.fn(() => {}),
          resetBoard: vi.fn(() => {}),
          handleAutoBet: vi.fn(() => {}),
          handleManualBet,
          handleOnePlay: vi.fn(() => {}),

          selectedFiatCurrency: 'any',
          isSound: 'any',
          // liveStatsModal: LiveStatsModal,
          lang: 'any',
          maxPayoutData: 'any',
          currentWalletState: 'any',
          coinPriceData: 'any',
          loading: true,
          curBalance: 100,
          setSelectedFiatCurrency: vi.fn(() => {}),
          setIsSound: vi.fn(() => {}),
          setLang: vi.fn(() => {}),
          setMaxPayoutData: vi.fn(() => {}),
          setCurrentWalletState: vi.fn(() => {}),
          setCoinPriceData: vi.fn(() => {}),
          setLoading: vi.fn(() => {})
        }}
      >
        <div>
          <DiceBoard />
          <DiceSidebar changeLayout={false} />
        </div>
      </DiceContext.Provider>
    )

    const profitElement = screen.getByTestId(
      'profit-on-win'
    ) as HTMLInputElement
    const inputElement = screen.getByTestId('bet-amount') as HTMLInputElement
    const sliderElement = screen.getByTestId(
      'dice-slider-input'
    ) as HTMLInputElement
    const betButton = screen.getByTestId('bet-button') as HTMLButtonElement

    // Change Win Chance slider
    fireEvent.change(inputElement, { target: { value: '0.05' } })
    // Input Bet Amount
    fireEvent.change(sliderElement, {
      target: { value: rollOverUnder }
    })

    await waitFor(async () => {
      expect(handleManualBet).toHaveBeenCalled()
      expect(sliderElement.value).toBe(rollOverUnder)
    })

    // Run Bet
    fireEvent.click(betButton)
  })
})
