from app.calculations import add, substract, multiply, divide
import pytest

@pytest.mark.parametrize("num1,num2,expected",[(2,3,5),(3,4,7),(2,-1,1)])
def test_add(num1,num2,expected):
   assert add(num1,num2) == expected

@pytest.mark.parametrize("num1,num2,expected",[(2,3,-1),(13,4,9),(0,0,0)])
def test_substract(num1,num2,expected):
    assert substract(num1,num2) == expected


@pytest.mark.parametrize("num1,num2,expected",[(2,3,6),(-3,4,-12),(0,0,0)])
def test_multiply(num1,num2,expected):
     assert multiply(num1,num2) == expected


@pytest.mark.parametrize("num1,num2,expected",[(5,2,2.5),(10,5,2),(2,1,2)])
def test_divide(num1,num2,expected):
     assert divide(num1,num2) == expected


