from app.bankaccount import BankAccount
import pytest

@pytest.fixture
def zero_bank_account():
    return BankAccount()

@pytest.fixture
def bank_account():
    return BankAccount(100)

def test_default_balance(zero_bank_account):
    assert zero_bank_account.balance == 0

def test_deposite_balance(zero_bank_account):
    zero_bank_account.deposite(100)
    assert zero_bank_account.balance == 100   

def test_withdraw_balance(bank_account):
    bank_account.withdraw(50)
    assert bank_account.balance == 50   

def test_interest_on_balance(bank_account):
    bank_account.collect_interest()
    assert round(bank_account.balance,5) == 110   

@pytest.mark.parametrize("deposited,withdrew,expected",[
    (200,100,100),
    (50,10,40),
    (1200,200,1000)
])
def test_bank_transaction(zero_bank_account,deposited,withdrew,expected):
    zero_bank_account.deposite(deposited)
    zero_bank_account.withdraw(withdrew)
    assert zero_bank_account.balance == expected
