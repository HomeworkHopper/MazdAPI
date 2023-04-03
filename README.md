<div align="center">

MazdAPI Client
=====================

A Flask application built atop the [pymazda project](https://github.com/bdr99/), which somehow managed to demystify the non-public facing, inconsistantly designed, and (to my knowledge) entirely undocumented Mazda Connected Services API used by the MyMazda mobile app.

</div>

## Overview

Those with a connected-service-capable Mazda vehicle can use this application to perform many of the same actions present in the MyMazda mobile app.
This includes, but is not neccesarilly limited to:
- Querying a list of vehicles associated with a MyMazda account
- Querying the status (tire pressure, fuel remaining, last location, etc.) of a given vehicle
- Remotely locking/unlocking the doors of a given vehicle
- Remotely starting/stopping the engine of a given vehicle

## Usage & Development

Getting this application up and running should require only the following few steps:
1. Clone this repository
2. Install the required dependencies (`python3 -r requirements.txt`)
3. Create a `config.yml` file containing your MyMazda email, password, and region (see `config_example.yml` for reference)
4. Run the application with `python3 app.py`

## Scope & Limitations

This project was primarally intended to serve as a fun experiment in web-development, and was NOT designed to be all-encompassing in capability or particularly appealing to view.
Furthermore, although the application does function quite well when working with my own vehicle, it will most certainly not function correctly if paired with certain other models.
Specifically speaking, electric Mazda vehicles, which have an entirely different set of API routes associated with them, are not supported by this application.

It is also important to note that, due to the unstable nature of the backing API, this app could break at any time.
