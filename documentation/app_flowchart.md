flowchart TD
    LP[Landing Page]
    SI[SignIn/SignUp]
    CR[Choose Role: Startup, Investor, Admin]
    OB[Onboarding]
    SD[Startup Dashboard]
    ID[Investor Dashboard]
    AD[Admin Dashboard]
    
    LP --> SI
    SI --> CR
    CR --> OB
    OB --> SD
    OB --> ID
    OB --> AD
    
    SD --> IM[Import Data CSV Excel PDF]
    SD --> RA[Real-time Analytics]
    SD --> FR[Financial Reports]
    SD --> MI[Market Insights]
    
    ID --> DS[Discover Startups]
    ID --> DD[Due Diligence Reports]
    ID --> RA2[Risk Analysis]
    ID --> PT[Portfolio Tracking]
    
    AD --> UM[User Management]
    AD --> PM[Platform Monitoring]
    AD --> SC[Security Compliance]
    
    SI --- OAuth[OAuth Registration via Google LinkedIn]
    CR --- RoleSelect[Role Selection Process]
    SD --- SettingS[Settings and Account Management]
    ID --- SettingI[Settings and Account Management]
    AD --- SettingA[Settings and Account Management]