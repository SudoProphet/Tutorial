principal = 0
rate = 0
time = 0


while principal<=0 :
    principal=float(input("Enter the principal amount : "))
    if principal<=0:
        print("The principal amount cannot be zero or negative.")


while rate<=0 :
    rate=float(input("Enter the interest rate : "))
    if rate<=0:
        print("The interest rate cannot be zero or negative.")


while time<=0 :
    time=int(input("Enter the time in years : "))
    if time<=0:
        print("Time cannot be zero or negative.")



total = principal*pow((1+rate/100),time)
    
    

print("The principal amount you are depositing is",principal)
print("The interest rate is",rate)
print("You are depositing the money for",time, "years")


print('Your balance after',time,'years is',total,'rupees')