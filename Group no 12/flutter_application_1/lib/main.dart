// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

void main() {
  runApp(TicketValidationApp());
}

class TicketValidationApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Railway Ticket Validator',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: TicketValidationPage(),
    );
  }
}

class TicketValidationPage extends StatefulWidget {
  @override
  _TicketValidationPageState createState() => _TicketValidationPageState();
}

class _TicketValidationPageState extends State<TicketValidationPage> {
  File? _image;
  final ImagePicker _picker = ImagePicker();
  String _ticketStatus = 'No ticket uploaded';
  int _selectedIndex = 0;
  String? _selectedStation;
  final List<String> _stations = [
    'Kalyan',
    'Dombivli',
    'Thane',
    'Mulund',
    'Ghatkopar',
    'Kurla',
    'Dadar',
    'Byculla',
    'Csmt'
  ];

  Future<void> _pickImage() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
        _ticketStatus = 'Ticket is Valid';
      });
    }
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });

    if (index == 0) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => TicketValidationPage()),
      );
    } else if (index == 1) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => SettingsPage()),
      );
    }
  }

  void _selectDrawerItem(int index) {
    Navigator.pop(context);
    switch (index) {
      case 0:
        setState(() {
          _ticketStatus = 'Offline Ticket Scan Selected';
        });
        break;
      case 1:
        // Navigate to the Online Ticket Booking page
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => OnlineTicketBookingPage()),
        );
        break;
      case 2:
        setState(() {
          _ticketStatus = 'QR Ticket Scan Selected';
        });
        break;
      case 3:
        setState(() {
          _ticketStatus = 'Digital Ticket Scan Selected';
        });
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('RailSmart Ticket Validator'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text(
                'Ticket Scanning Options',
                style: TextStyle(color: Colors.white, fontSize: 24),
              ),
            ),
            ListTile(
              leading: Icon(Icons.offline_pin),
              title: Text('Scan by Offline Ticket'),
              onTap: () => _selectDrawerItem(0),
            ),
            ListTile(
              leading: Icon(Icons.offline_pin),
              title: Text('Online Ticket Booking'),
              onTap: () =>
                  _selectDrawerItem(1), // Added case for online booking
            ),
            ListTile(
              leading: Icon(Icons.qr_code),
              title: Text('Scan by QR Ticket'),
              onTap: () => _selectDrawerItem(2),
            ),
            ListTile(
              leading: Icon(Icons.phone_android),
              title: Text('Scan by Digital Ticket'),
              onTap: () => _selectDrawerItem(3),
            ),
          ],
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            _image != null ? Image.file(_image!) : Text('No image selected'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _pickImage,
              child: Text('Upload Ticket Image'),
            ),
            SizedBox(height: 20),
            Text(
              'Ticket Status: $_ticketStatus',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            DropdownButton<String>(
              hint: Text('Found at Station'),
              value: _selectedStation,
              items: _stations.map((String station) {
                return DropdownMenuItem<String>(
                  value: station,
                  child: Text(station),
                );
              }).toList(),
              onChanged: (String? newValue) {
                setState(() {
                  _selectedStation = newValue;
                });
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      ),
    );
  }
}

class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
      ),
      body: ListView(
        children: [
          ListTile(
            leading: Icon(Icons.person),
            title: Text('View Profile'),
            onTap: () {},
          ),
          ListTile(
            leading: Icon(Icons.history),
            title: Text('Previous Scanned Tickets'),
            onTap: () {},
          ),
          ListTile(
            leading: Icon(Icons.error),
            title: Text('View Offenders'),
            onTap: () {},
          ),
          ListTile(
            leading: Icon(Icons.login),
            title: Text('Login/Logout'),
            onTap: () {},
          ),
        ],
      ),
    );
  }
}

class OnlineTicketBookingPage extends StatefulWidget {
  @override
  _OnlineTicketBookingPageState createState() =>
      _OnlineTicketBookingPageState();
}

class _OnlineTicketBookingPageState extends State<OnlineTicketBookingPage> {
  // These variables will store the selected station values
  String? selectedDepartureStation;
  String? selectedArrivalStation;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Online Ticket Booking'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                // Add buttons for various options
                IconButton(
                  icon: Icon(Icons.history),
                  onPressed: () {},
                  iconSize: 50,
                ),
                Text('Booking History'),
                IconButton(
                  icon: Icon(Icons.confirmation_number),
                  onPressed: () {},
                  iconSize: 50,
                ),
                Text('Show Ticket'),
              ],
            ),
          ),
          // Station selection for "Normal Booking"
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              children: [
                Text(
                  'NORMAL BOOKING',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 25,
                    color: Colors.blue,
                  ),
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Column(
                      children: [
                        Text(
                          'Depart from',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                            color: Colors.grey,
                          ),
                        ),
                        DropdownButton<String>(
                          value: selectedDepartureStation,
                          items: <String>[
                            'Kalyan',
                            'Dombivli',
                            'Thane',
                            'Mulund',
                            'Ghatkopar',
                            'Kurla',
                            'Dadar',
                            'Byculla',
                            'Csmt'
                          ].map((String value) {
                            return DropdownMenuItem<String>(
                              value: value,
                              child: Text(value),
                            );
                          }).toList(),
                          onChanged: (String? newValue) {
                            setState(() {
                              selectedDepartureStation = newValue;
                            });
                          },
                          hint: Text('Select Station'),
                        ),
                      ],
                    ),
                    SizedBox(width: 20),
                    Column(
                      children: [
                        Text(
                          'Going to',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                            color: Colors.grey,
                          ),
                        ),
                        DropdownButton<String>(
                          value: selectedArrivalStation,
                          items: <String>[
                            'Kalyan',
                            'Dombivli',
                            'Thane',
                            'Mulund',
                            'Ghatkopar',
                            'Kurla',
                            'Dadar',
                            'Byculla',
                            'Csmt'
                          ].map((String value) {
                            return DropdownMenuItem<String>(
                              value: value,
                              child: Text(value),
                            );
                          }).toList(),
                          onChanged: (String? newValue) {
                            setState(() {
                              selectedArrivalStation = newValue;
                            });
                          },
                          hint: Text('Select Station'),
                        ),
                      ],
                    ),
                  ],
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        // Handle next trains action
                      },
                      child: Text('Next Trains'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        // Handle fare calculation action
                      },
                      child: Text('Get Fare'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
