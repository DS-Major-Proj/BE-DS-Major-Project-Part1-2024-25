import 'package:flutter/material.dart';

class Finance extends StatelessWidget {
  const Finance({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Finance"),
      ),
      body: const Center(
        child: Text("Financial Tools and Services will be shown here."),
      ),
    );
  }
}
